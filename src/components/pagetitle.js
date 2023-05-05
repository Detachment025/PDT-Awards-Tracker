// Imports 
import { usePathname } from 'next/navigation';

// Page formatter function
const PageTitle = () => {

	// Get current path
	const currentPath = usePathname();
	
	console.log(currentPath
		.split('/')
		.slice(1)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' / ')
	)

	// Return
	return(
		<div className="font-poppins text-3xl mb-16">
			{ 
				(currentPath == "/") ? "Home" :
				currentPath
					.split('/')  
					.slice(1)
					.map(word => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' / ')
			}
		</div>
	);

}

// Export styling
export default PageTitle