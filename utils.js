import bunyan from 'bunyan';
import admin from 'firebase-admin';

export const log = bunyan.createLogger({name: "myapp"});

export const firebaseConfig = {
    admin
}

