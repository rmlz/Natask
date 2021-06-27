import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import SuccessHolder from '../Models/SuccessHolder';

export const createUserWithEmailAndPassword = async (email, password) => {
  const successObj = new SuccessHolder();
  const {user} = await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('Conta criada e usuário logado');
      return true;
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Email já está sendo utilizado, escolha outro');
      }
      return false;
    });
};

export const signInWithEmailAndPassword = async (email, password) => {
  if (email.length > 0 && password.length > 0) {
    const successObj = await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const obj = new SuccessHolder();
        obj.success = true;
        obj.message = 'Usuario logado';
        console.log(obj);
        return obj;
      })
      .catch(error => {
        console.log(error);
        const obj = new SuccessHolder();
        obj.success = false;
        obj.message = 'Não foi possível fazer login';
        return obj;
      });
    return successObj;
  }
};

export const signOut = async () => {
  await auth()
    .signOut()
    .then(() => console.log('Usuario desconectado'));
};
