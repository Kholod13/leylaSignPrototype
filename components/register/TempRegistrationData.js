import { usersList } from '../../components/Data';

// tempUserStore.js
export const tempUserData = {
  nativeLanguage: '',
  learnedLanguage: '',
  levelLanguage: '',
  interests: [],
  username: '',
  email: '',
  password: '',
};

export function setNativeLanguage(language) {
  tempUserData.nativeLanguage = language;
  console.log('✅ Set native language to:', language);
}
export function setLearnedLanguage(language) {
  tempUserData.learnedLanguage = language;
  console.log('✅ Set learned language to:', language);
}
export function setLevelLanguage(level) {
  tempUserData.levelLanguage = level;
  console.log('✅ Set level language to:', level);
}
export function setInterests(interests) {
  tempUserData.interests = interests;
  console.log('✅ Set interests to:', interests);
}
export function setUsernameTemp(username) {
  tempUserData.username = username;
  console.log('✅ Set username to:', username);
}
export function setEmailTemp(email) {
  tempUserData.email = email;
  console.log('✅ Set email to:', email);
}
export function setPasswordTemp(password) {
  tempUserData.password = password;
  console.log('✅ Set password to:', password);
}

export function showUserData(){
    for(let key in tempUserData) {
        console.log(`${key}: ${tempUserData[key]}`);
    }
}

export function clearTempUserData() {
  for (let key in tempUserData) {
    tempUserData[key] = '';
  }
  console.log('✅ Cleared temporary user data');
}

export function pushTempUserData() {
    usersList.push({
        key: (usersList.length + 1).toString(),
        label: tempUserData.username,
        email: tempUserData.email,
        password: tempUserData.password,
        nativeLanguage: tempUserData.nativeLanguage,
        learnedLanguage: tempUserData.learnedLanguage,
        levelLanguage: tempUserData.levelLanguage,
        interests: tempUserData.interests,
        folders: [], // Initialize with an empty array for folders
    });

}   