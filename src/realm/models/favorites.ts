import Realm from 'realm';

import Books from './books';
import uuid from 'react-native-uuid';

export default class  Favorites extends Realm.Object<Favorites>{
    _id!: string;
    favorites!: Books[];
    userId!:string;

    static schema:Realm.ObjectSchema = {
        name:'Favorites',
        properties:{
            _id:{type:'string',default:() => uuid.v4()},
            favorites:'Books[]',
            userId:'string'
        },
        primaryKey:'_id'
    }
}