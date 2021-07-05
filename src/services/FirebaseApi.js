import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';
import SuccessHolder from '../Models/SuccessHolder';
import {Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';

export const createUserWithEmailAndPassword = async (
  email,
  password,
  screen,
) => {
  const successObj = new SuccessHolder();
  const {user} = await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(item => {
      console.log('Conta criada e usuário logado', item.user);
      Alert.alert(
        'Sucesso',
        `Usuario criado com o e-mail ${screen.state.email}`,
        [
          {
            text: 'Ok',
            onPress: () => screen.props.navigation.goBack(),
          },
        ],
      );
      Promise.resolve(item.user);
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Não deu!',
          'Email já está sendo utilizado, escolha outro',
          [{text: 'Ok', onPress: () => null}],
        );
        console.log('Email já está sendo utilizado, escolha outro');
      } else {
        Alert.alert(
          'Não deu!',
          'Cara...não deu, depois vamos melhorar essa mensagem..mas não deu mesmo!\nTente novamente, ou xingue muito no twitter...',
          [{text: 'Ok', onPress: () => null}],
        );
      }
      Promise.reject({error: 'error'});
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
  } else {
    Alert.alert('Algo errado.', 'As credenciais devem ser preenchidas.', [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ]);
  }
};

export const signOut = async () => {
  await auth()
    .signOut()
    .then(() => {
      console.log('Usuario desconectado');
    });
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
  let lastObj = await getTasksOnFirebase(user);
  //console.log('taaaaaaaaaaaaasssk                  ', task);

  if (lastObj != undefined) {
    //(lastObj, '-----------------');
    if (lastObj != null && Object.keys(lastObj).length != 0) {
      //console.log('not null', lastObj);
      lastObj.itens = lastObj.itens.filter(item => item.uuid != task.uuid);
      lastObj.itens.push(task);
    }
  } else {
    //console.log('null', lastObj);
    lastObj = {itens: [task]};
  }

  const updatedObj = lastObj;
  console.log('newobj', updatedObj);

  let taskData = await firestore()
    .collection('Tasks')
    .doc(user.uid)
    .set({itens: updatedObj.itens}, {merge: true})
    .then(() => {
      console.log('Task added');
    });
};

export const getTasksOnFirebase = async user => {
  let docRef = await listenTasksOnFirestore(user.uid);
  const get = await docRef.get();
  const data = await get.data();
  return data;
};

export const listenTasksOnFirestore = async userUID => {
  return firestore().collection('Tasks').doc(userUID);
};
