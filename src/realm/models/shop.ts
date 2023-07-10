import Realm from 'realm';
import Books from './books';
import uuid from 'react-native-uuid';

export default class Shop extends Realm.Object<Shop>{
    _id!:string;
    cart?:Books[];
    orders?:Books[];
    userId!:string;

    static schema:Realm.ObjectSchema = {
        name:'Shop',
        properties:{
            _id:{type:'string',default:() => uuid.v4()},
            orders:'Books[]',
            cart:'Books[]',
            userId:'string'
        },
        primaryKey:'_id'
    }
}