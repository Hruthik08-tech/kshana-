import { useState, useEffect } from 'react';
import MapComponent from '../components/MapComponent';
import { SearchBar } from '../components/ui/SearchBar';
import { TailSpin } from 'react-loader-spinner'; 



/**
 * DiscoverPage acts as the main entry for the interactive map.
 * Prepared with a manageable layout for a future sidebar and search functionality.
 */

const getCoordinates = (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Resolve with the specific tuple type [number, number]
        resolve([position.coords.latitude, position.coords.longitude]);
      },
      (error) => reject(error)
    );
  });
};

export const DiscoverPage = () => {
    // State placeholder for a future search query functionality
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);

        getCoordinates()
            .then(coords => {
                setUserLocation(coords);
                console.log("User Location:", coords);
                setIsLoading(false);

            })

            .catch(error => {
                console.error("Error fetching location:", error);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);



   

    // Example dummy data for markers that we might fetch from Node.js/MySQL later
    const dummyMarkers = [
        {
            id: 'user-location',
            position: userLocation,
            title: "User Location",
            description: "Your current location"
        }
    ];

    /**
     * Handles search actions when adding a new search feature
     * @param query The search string typed by the user
     */
    // const handleSearch = (query: string) => {
    //     setSearchQuery(query);
    //     // Future: Fetch new map data via backend API / Kafka and update state based on query
    //     console.log("Searching for:", query);
    // };

    return (
        <div className="h-screen w-full flex bg-cloud-white font-nunito text-slate-800 antialiased overflow-hidden">
            {/* Immersive Floating Search Overlay */}
            {isLoading && (
                <div className="flex items-center justify-center h-screen w-full">
                    <TailSpin 
                        height="80"
                        width="80"
                            color="#4A90E2"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            visible={true}
                    />
                </div>
            )};
            

            <div className="absolute top-0 left-0 w-full z-[1000] pointer-events-none p-4 sm:p-6 md:pt-8">
                <div className="max-w-3xl mx-auto flex items-center justify-center pointer-events-auto w-full">
                    <div className="w-full max-w-[95%] sm:max-w-full">
                        <SearchBar />
                    </div>
                </div>
            </div>
            {/* Main Full-Screen Map Container */}
            <div className="flex-1 relative w-full h-full"> 
                {/* 
                  Sidebar Container:
                  Hidden on mobile, potentially a drawer or side panel on desktop later.
                */}

                <main className="absolute inset-0 bg-slate-100">
                    <MapComponent 
                        center={userLocation || undefined} 
                        zoom={15} 
                        markers={dummyMarkers[0].position ? dummyMarkers : []}
                    />
                </main>
            </div>
        </div>
    );
};


// Exporting default for standard React routing usage (e.g. React.lazy)
export default DiscoverPage;
