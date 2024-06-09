import "react-native-url-polyfill/auto";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "6664b257002e4fd77c65",
  databaseId: "6664b6a1003d535aec6c",
  userCollectionId: "6664b6f70009fd943d75",
  videoCllectionId: "6664b78b001e5bdefdc5",
  storageId: "6664bb4200387a7e7165",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) 
  .setProject(appwriteConfig.projectId) 
  .setPlatform(appwriteConfig.platform); 

const account = new Account(client);
const avatars = new Avatars(client)
const databases = new Databases(client)

// CRUD Functions here

export const createUser = async (email, password, username) => {
  try {
    const newAccount =  await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if(!newAccount) throw new Error

    const avatarUrl = avatars.getInitials(username)

    await signIn(email, password)

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl
      }
    )

    return newUser
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
};


export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    throw new Error(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()

    if(!currentAccount) throw Error 

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if(!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    console.log(error)
  }
}