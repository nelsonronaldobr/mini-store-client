import { Provider } from 'react-redux';
import { AppRoutes } from './routes';
import { store } from './store';
import { Toaster } from 'react-hot-toast';

export const DevStoreApp = () => {
    return (
        <Provider store={store}>
            <Toaster position='bottom-right' reverseOrder={true} />
            <AppRoutes />
        </Provider>
    );
};
