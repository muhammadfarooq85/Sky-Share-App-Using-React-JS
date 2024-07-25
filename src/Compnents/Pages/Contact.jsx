import { MdOutlineAttachEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { SlSocialStumbleupon } from "react-icons/sl";
import FloatBtnComp from "../FloatBtn";

function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h3 className="text-center text-4xl font-bold mb-10">Contact Us</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        <div className="flex flex-col justify-center items-center gap-2 bg-white p-6 rounded-2xl shadow-md">
          <MdOutlineAttachEmail size={60} />
          <h4 className="text-2xl ">Email</h4>
          <p className="text-xl text-center contactEmail">
            famuhammd907@gmail.com
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 bg-white p-6 rounded-2xl shadow-md">
          <MdLocationOn size={60} />
          <h4 className="text-2xl">Location</h4>
          <p className="text-xl text-center">Pakistan, Punjab, Arifwala</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 bg-white p-6 rounded-2xl shadow-md">
          <SlSocialStumbleupon size={60} />
          <h4 className="text-2xl">Social Platforms</h4>
          <p className="text-xl text-center">Facebook, LinkedIn, Github</p>
        </div>
      </div>
      <FloatBtnComp />
    </div>
  );
}

export default ContactPage;
