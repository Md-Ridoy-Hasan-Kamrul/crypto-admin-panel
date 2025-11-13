import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const placeTrade = async (uid, amount) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) throw new Error('User not found');

    const { tradeMode = 'random' } = userSnap.data();

    let result = 'lose';
    if (tradeMode === 'always_win') result = 'win';
    else if (tradeMode === 'always_lose') result = 'lose';
    else result = Math.random() < 0.5 ? 'win' : 'lose';

    await addDoc(collection(db, 'trades'), {
      uid,
      amount,
      result,
      createdAt: serverTimestamp(),
    });

    return { success: true, result };
  } catch (error) {
    console.error('Trade Error:', error);
    return { success: false, error: error.message };
  }
};
