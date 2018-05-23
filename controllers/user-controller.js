import { db } from '../server';
import { log } from '../utils';

export default {
  /**
   * signup a new user to firestore
   * @method signup signup user 
   * @param {object} req user request object
   * @param {object} res servers response
   * @return {object} error message | success message
   */
  signup(req, res) {
    const userQuery = db.collection('users');
    const emailQuery = userQuery.where('email', '==', req.body.email);
    emailQuery.limit(1)
      .get().then((snapShot) => {
        if (!snapShot.empty) {
          return res.status(401).json({
            message: 'Email already in use',
            success: false
          })
        } else {
          userQuery.add(req.body)
            .then(ref => {
              log.info(`Added document with ID: ${ref.id}`);
              return res.status(201).send({
                message: `Added document with ID: ${ref.id}`,
                success: true
              });
            }, (error) => {
              log.error(error);
            })
            .catch((error) => {
              log.error(error);
              return res.status(500).send({
                message: 'Internal server error',
                success: false
              })
            })
        }
      })
  }
}
