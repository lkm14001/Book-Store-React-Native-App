import Realm from 'realm';
import Books from './books';
import uuid from 'react-native-uuid';

export default class Rating extends Realm.Object<Rating>{
    _id!:string;
    ratings!:Books[];
    userId!:string;

    static schema:Realm.ObjectSchema = {
        name:'Rating',
        properties:{
            _id:{type:'string',default:() => uuid.v4()},
            ratings:'Books[]',
            userId:'string'
        },
        primaryKey:'_id'
    }
}