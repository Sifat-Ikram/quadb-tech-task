import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const Summary = () => {
    const { id } = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        fetch('https://api.tvmaze.com/search/shows?q=all')
            .then(res => res.json())
            .then(data => setData(data))
    }, []);
    if (!data) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    const filteredItem = data.filter(show => show.score.toString() === id);
    const showDetails = filteredItem[0].show;
    console.log(showDetails);



    return (
        <div className="w-4/5 mx-auto space-y-5 my-10">
            <Link to={"/"}>
                <button className="btn btn-primary">Previous</button>
            </Link>
            <div className="my-20 space-y-10">
                <h1 className="text-5xl font-extrabold text-center">Show Details</h1>
                <div className="flex flex-col justify-center items-center">
                    <img src={showDetails.image.original} alt={showDetails.name} className="h-96" />
                </div>
                <div className="space-y-5">
                    <h1><span className="font-bold text-xl">Show: {showDetails.name}</span></h1>
                    <h1 className='flex gap-2 items-center'>
                        <span className='font-bold text-xl'>Genres: </span> {showDetails.genres.map(type => <h1 key={type}>{type}</h1>)}
                    </h1>
                    <h1><span className="font-bold text-xl">Language: </span> {showDetails.language}</h1>
                    <h1><span className="font-bold text-xl">Premiered Date: </span> {showDetails.premiered}</h1>
                    <h1><span className="font-bold text-xl">Summary: </span>
                        <p className="mt-3" dangerouslySetInnerHTML={{ __html: showDetails.summary }} />
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Summary;