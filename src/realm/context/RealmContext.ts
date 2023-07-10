import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import Favorites from '../models/favorites';
import Books from '../models/books';
import Rating from '../models/rating';
import Shop from '../models/shop';

const realmConfig: Realm.Configuration = {
  schema: [Favorites, Books, Rating,Shop],
  schemaVersion:2
};

export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
