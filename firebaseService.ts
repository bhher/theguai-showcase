// Firebase 서비스 함수들
import { collection, addDoc, getDocs, query, orderBy, Timestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export interface ContactFormData {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
}

// Contact 폼 데이터를 Firebase에 저장
export const saveContactForm = async (data: ContactFormData): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...data,
      createdAt: Timestamp.now()
    });
    console.log('Contact form saved with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error saving contact form: ', error);
    throw error;
  }
};

// 모든 Contact 데이터 조회
export const getAllContacts = async (): Promise<ContactFormData[]> => {
  try {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const contacts: ContactFormData[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      contacts.push({
        id: doc.id,
        name: data.name,
        email: data.email,
        message: data.message,
        createdAt: data.createdAt?.toDate() || new Date()
      } as ContactFormData & { id: string });
    });
    
    return contacts;
  } catch (error) {
    console.error('Error getting contacts: ', error);
    throw error;
  }
};

// Contact 데이터 삭제
export const deleteContact = async (contactId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'contacts', contactId));
    console.log('Contact deleted with ID: ', contactId);
  } catch (error) {
    console.error('Error deleting contact: ', error);
    throw error;
  }
};

