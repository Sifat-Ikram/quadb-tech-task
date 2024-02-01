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

    const handleSubmit = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const country = form.get('country');
        const date = form.get('date');
        const language = form.get('language');
        const time = form.get('time');

        const showData = {
            name,
            country,
            date,
            language,
            time,
        };

        localStorage.setItem('showData', JSON.stringify(showData));

        const modal = document.getElementById('my_modal_5');
        modal.close();
    }

    return (
        <div className="w-4/5 mx-auto space-y-5 my-10">
            <Link to={"/"}>
                <button className="btn btn-primary">Previous</button>
            </Link>
            <div className="my-20 space-y-10">
                <h1 className="md:text-5xl text-3xl font-extrabold text-center">Show Details</h1>
                <div className="flex flex-col justify-center items-center">
                    <img src={showDetails.image.original} alt={showDetails.name} className="h-96" />
                </div>
                <div className="space-y-5">
                    <h1><span className="font-bold text-xl">Show: {showDetails.name}</span></h1>
                    <h1 className='flex gap-2 items-center'>
                        <span className='font-bold text-xl'>Genres: </span> {showDetails.genres.map(type => <div key={type}>{type}</div>)}
                    </h1>
                    <h1><span className="font-bold text-xl">Language: </span> {showDetails.language}</h1>
                    <h1><span className="font-bold text-xl">Premiered Date: </span> {showDetails.premiered}</h1>
                    <h1><span className="font-bold text-xl">Summary: </span>
                        <p className="mt-3" dangerouslySetInnerHTML={{ __html: showDetails.summary }} />
                    </h1>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_5').showModal()}>book</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <form className="card-body" onSubmit={handleSubmit}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Show name</span>
                                        </label>
                                        <input type="text"
                                            name="name"
                                            className="input input-bordered"
                                            defaultValue={showDetails.name} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Country</span>
                                        </label>
                                        <input type="text"
                                            name="country"
                                            className="input input-bordered"
                                            defaultValue={showDetails?.network?.country?.name} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">language</span>
                                        </label>
                                        <input type="text"
                                            name="language"
                                            className="input input-bordered"
                                            defaultValue={showDetails.language} />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Date</span>
                                        </label>
                                        <input type="date"
                                            name="date"
                                            className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Time</span>
                                        </label>
                                        <input type="text"
                                            name="time"
                                            className="input input-bordered"
                                            defaultValue={showDetails.schedule.time} />
                                    </div>
                                    <div className="form-control mt-6">
                                        <button type="submit" className="btn btn-primary">Confirm</button>
                                    </div>
                                </form>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;