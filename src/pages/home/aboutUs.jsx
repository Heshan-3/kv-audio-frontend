import ReviewCard from "../../components/reviewCard";
import Reviews from "../../components/reviews";

export default function AboutUs(){
    return(
        <div>
            <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="w-[300px] md:mr-10">
                    {<Reviews/>}
                </div>
                <div className="w-[350px] h-[200px] md:w-[900px] md:h-[425px] overflow-y-auto pr-2">
                    {<ReviewCard/>}
                </div>
            </div>
        </div>
    )
}