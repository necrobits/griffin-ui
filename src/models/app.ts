import { UserState } from '~/models';
import { SearchState } from '~/models';

export interface AppState {
    user: UserState;
    search: SearchState;
}
