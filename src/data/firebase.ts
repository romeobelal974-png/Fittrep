import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  collectionGroup
} from "firebase/firestore";
import { User, Category, Video } from "../types";
import { INITIAL_CATEGORIES, INITIAL_VIDEOS, INITIAL_USERS } from "./mockDb";

import firebaseConfig from "../../firebase-applet-config.json";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with the specified database ID from the console config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

/**
 * Seeds the firestore database with default collections if they do not exist.
 * This runs on app startup to guarantee first-time launch is populated with all
 * categories, initial users, and workout videos.
 */
export async function seedFirestoreIfNeeded() {
  try {
    // 1. Sync and update categories directly (very cheap, ensures correct name e.g. "Upper")
    console.log("Syncing categories...");
    for (const cat of INITIAL_CATEGORIES) {
      await setDoc(doc(db, "categories", cat.id), cat);
    }

    // 2. Sync only missing default videos to avoid overwriting or massive redundant writes
    console.log("Checking for missing default videos...");
    const videoSnap = await getDocs(collection(db, "videos"));
    const existingVideoIds = new Set<string>();
    videoSnap.forEach((doc) => {
      existingVideoIds.add(doc.id);
    });

    let addedCount = 0;
    for (const vid of INITIAL_VIDEOS) {
      if (!existingVideoIds.has(vid.id)) {
        await setDoc(doc(db, "videos", vid.id), vid);
        addedCount++;
      }
    }
    if (addedCount > 0) {
      console.log(`Seeded ${addedCount} new videos into Firestore.`);
    }

    // 3. Seed initial users if empty
    const userSnap = await getDocs(collection(db, "users"));
    if (userSnap.empty) {
      console.log("Seeding initial users into Firestore...");
      for (const u of INITIAL_USERS) {
        await setDoc(doc(db, "users", u.id), u);
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, "seed_collections");
  }
}

// Helper methods to write directly to Firestore collections

export function cleanUndefined(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(cleanUndefined);
  }
  const clean: any = {};
  for (const key of Object.keys(obj)) {
    if (obj[key] !== undefined) {
      clean[key] = cleanUndefined(obj[key]);
    }
  }
  return clean;
}

export async function addOrUpdateUserFirestore(user: User) {
  try {
    const cleaned = cleanUndefined(user);
    await setDoc(doc(db, "users", user.id), cleaned);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.id}`);
  }
}

export async function addOrUpdateCategoryFirestore(category: Category) {
  try {
    const cleaned = cleanUndefined(category);
    await setDoc(doc(db, "categories", category.id), cleaned);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `categories/${category.id}`);
  }
}

export async function deleteCategoryFirestore(id: string) {
  try {
    await deleteDoc(doc(db, "categories", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `categories/${id}`);
  }
}

export async function addOrUpdateVideoFirestore(video: Video) {
  try {
    const cleaned = cleanUndefined(video);
    await setDoc(doc(db, "videos", video.id), cleaned);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `videos/${video.id}`);
  }
}

export async function deleteVideoFirestore(id: string) {
  try {
    await deleteDoc(doc(db, "videos", id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `videos/${id}`);
  }
}
