import Realm from 'realm';
import uuid from 'react-native-uuid';

export default class Books extends Realm.Object<Books>{
    _id!:string;
    title!:string;
    author!:string;
    genre!:string[];
    image!:string;
    rating?:number;
    file!:string;
    id!:number;
    price!:number;

    static schema:Realm.ObjectSchema = {
        name: 'Books',
        embedded:true,
        properties: {
            _id:{type:'string',default:() => uuid.v4()},
            id:'int',
            file:'string',
            title:'string',
            author:'string',
            genre:'string[]',
            image:'string',
            rating:{type:'int',optional:true},
            price:{type:'int'}
        },
    }
}

