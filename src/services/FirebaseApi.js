import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
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

export const currentUser = () => {
  return new Promise((res, rej) => {
    let unsubscribe = null;
    unsubscribe = auth().onAuthStateChanged(
      user => {
        res(user);
      },
      error => {
        rej(error);
      },
      () => {
        unsubscribe();
      },
    );
  });
};

export const writeTaskOnFirebase = async task => {
  const user = await currentUser();
  let lastObj = await getTasksOnFirebase(user.uid);

  if (lastObj != null || lastObj != undefined) {
      console.log('not null', lastObj)
    lastObj.itens.push(task);
  } else {
      console.log('null', lastObj)
    lastObj = {itens: [task]};
  }

  const updatedObj = lastObj;
  console.log('testeaaa', updatedObj);

  let taskData = await firestore()
    .collection('Tasks')
    .doc(user.uid)
    .set({itens: updatedObj.itens}, {merge: true})
    .then(() => {
      console.log('Task added');
    });
};

export const getTasksOnFirebase = async userUID => {
  let retorno;
  let taskData = await firestore()
    .collection('Tasks')
    .doc(userUID)
    .get()
    .then(res => {
      console.log('Tasks obtidas');
      retorno = res.data();
    });
  return retorno;
};
