import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore'
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage'
import { db, storage } from './firebase'

// Analytics helper
export const logEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Firestore operations
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding document:', error)
    throw error
  }
}

export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      throw new Error('Document not found')
    }
  } catch (error) {
    console.error('Error getting document:', error)
    throw error
  }
}

export const getDocuments = async (collectionName: string, constraints?: any[]) => {
  try {
    let q = collection(db, collectionName)
    
    if (constraints) {
      q = query(q, ...constraints)
    }
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting documents:', error)
    throw error
  }
}

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    })
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }
}

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(db, collectionName, docId))
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

// Storage operations
export const uploadFile = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return downloadURL
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export const deleteFile = async (path: string) => {
  try {
    const fileRef = ref(storage, path)
    await deleteObject(fileRef)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

// Product-specific functions
export const getProducts = async () => {
  return getDocuments('products', [orderBy('createdAt', 'desc')])
}

export const getProduct = async (productId: string) => {
  return getDocument('products', productId)
}

export const addProduct = async (productData: any) => {
  return addDocument('products', productData)
}

export const updateProduct = async (productId: string, productData: any) => {
  return updateDocument('products', productId, productData)
}

export const deleteProduct = async (productId: string) => {
  return deleteDocument('products', productId)
}

// User-specific functions
export const getUserProfile = async (userId: string) => {
  return getDocument('users', userId)
}

export const updateUserProfile = async (userId: string, profileData: any) => {
  return updateDocument('users', userId, profileData)
}

// Order functions
export const createOrder = async (orderData: any) => {
  return addDocument('orders', orderData)
}

export const getUserOrders = async (userId: string) => {
  return getDocuments('orders', [
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  ])
}
