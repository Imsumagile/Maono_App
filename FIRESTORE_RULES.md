# Firebase Firestore Security Rules

To fix the "Missing or insufficient permissions" error, you need to update your Firestore Security Rules in the Firebase Console.

## Steps to Update Firestore Rules:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **kikoba-app-28064**
3. Click on **Firestore Database** in the left sidebar
4. Click on the **Rules** tab
5. Replace the existing rules with the following:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users collection - users can read/write their own document
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Members collection - authenticated users can read, only admins can write
    match /members/{memberId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'Admin';
    }
    
    // Transactions collection - authenticated users can read, only admins can write
    match /transactions/{transactionId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'Admin';
    }
    
    // Default deny all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

6. Click **Publish** to save the rules

## What These Rules Do:

- **Users Collection**: 
  - Any authenticated user can read any user document
  - Users can only write to their own document
  
- **Members Collection**: 
  - Any authenticated user can read
  - Only users with role='Admin' can write
  
- **Transactions Collection**: 
  - Any authenticated user can read
  - Only users with role='Admin' can write

## Important Note:

After publishing these rules, the "Missing or insufficient permissions" error should disappear when you log in with a user that has a document in the `users` collection.
