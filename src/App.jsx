import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Detail from './pages/Detail';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{ index: true, element: <Home /> },
			{ path: '/watch/:videoId', element: <Detail /> }
		]
	}
]);

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
}

export default App;
