export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Tyler McGinnis',
        avatar: '',
        uid: 'tylermcginnis',
      })
    }, 2000)
  })
}

export function checkIfAuthed (store) {
  // Ignore Firebase
  return store.getState().isAuthed
}

export function logout () {
  console.log('Logged out!')
}
