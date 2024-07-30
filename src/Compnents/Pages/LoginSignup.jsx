import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../config/firebase.config";
import toast from "react-hot-toast";
import { MdOutlineAttachEmail } from "react-icons/md";
import { SiSkyrock } from "react-icons/si";
import { FaGoogle } from "react-icons/fa";
import FloatBtnComp from "../FloatBtn";
import InputComp from "../Input";
import { useTranslation } from "react-i18next";
import "../../config/i18Next";
import ForgotPasswordModalComp from "../ForgotPasswordModal";
import ButtonComp from "../Button";

export let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export let passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function SignupLoginFormPage() {
  const [type, setType] = useState("card");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleForgotModal = () => {
    setOpen(true);
  };

  //Registering  with emai land password
  const registerUser = async () => {
    if (signupEmail === "") {
      toast.error("Please provide email.");
    } else if (!emailRegex.test(signupEmail)) {
      toast.error("Invalid email.");
    } else if (signupPassword === "") {
      toast.error("Please provide password.");
    } else if (!passwordRegex.test(signupPassword)) {
      toast.error(
        "Password must be One uppercase, one lowerCase, one digit and one special character. Length should be 8."
      );
    } else {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Signup successfully.");
          setSignupEmail("");
          setSignupPassword("");
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            toast.error("Email already registerd. Please login!");
            return;
          }
          toast.error("Please try again");
        });
    }
  };

  //Signin User with email and password
  const signinUser = () => {
    if (signinEmail === "") {
      toast.error("Please provide email.");
    } else if (!emailRegex.test(signinEmail)) {
      toast.error("Invalid email.");
    } else if (signinPassword === "") {
      toast.error("Please provide password.");
    } else if (!passwordRegex.test(signinPassword)) {
      toast.error("Invlaid password.");
    } else {
      signInWithEmailAndPassword(auth, signinEmail, signinPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("Signin successfully.");
          setSigninEmail("");
          setSigninPassword("");
        })
        .catch((error) => {
          toast.error("Please try again.");
        });
    }
  };

  const signupWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        toast.success("Successfully signup with Goolge.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast.error("Please try again.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full dark:bg-darkPrimary dark:text-darkSecondary">
      <Card className="w-full sm:w-[70%] md:w-[50%] lg:w-[40%]">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="bg-secondary dark:bg-darkPrimary m-0 grid place-items-center px-4 py-8 text-center"
        >
          <div className="mb-4 w-full flex justify-center items-center">
            <SiSkyrock className="h-20 w-20 text-white" />
          </div>
          <Typography variant="h5" color="white">
            {t("appName")}
          </Typography>
        </CardHeader>
        <CardBody className="w-full">
          <Tabs value={type}>
            <TabsHeader className="relative z-0">
              <Tab value="card" onClick={() => setType("card")}>
                {t("signup")}
              </Tab>
              <Tab value="paypal" onClick={() => setType("paypal")}>
                {t("signin")}
              </Tab>
            </TabsHeader>
            <TabsBody
              animate={{
                initial: {
                  x: type === "card" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "card" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="card" className="p-0">
                <form className="mt-8 flex flex-col gap-4">
                  <InputComp
                    inputType="email"
                    inputValue={signupEmail}
                    inputOnChange={(e) => setSignupEmail(e.target.value)}
                    inputPlaceHolder="name@gmail.com"
                    inputAddonAfter={
                      <MdOutlineAttachEmail className="dark:text-darkSecondary" />
                    }
                  />
                  <InputComp
                    inputType="password"
                    inputValue={signupPassword}
                    inputOnChange={(e) => setSignupPassword(e.target.value)}
                    inputPlaceHolder="*******"
                  />
                  <Button
                    size="lg"
                    className="bg-secondary dark:bg-darkPrimary dark:text-darkSecondary"
                    onClick={registerUser}
                  >
                    {t("signup")}
                  </Button>
                  <span className="text-center text-xl font-bold">or</span>
                  <ButtonComp
                    btnIcon={<FaGoogle />}
                    clickOnUniversalBtn={signupWithGoogle}
                    title={t("signupGoogle")}
                  />
                </form>
              </TabPanel>
              <TabPanel value="paypal" className="p-0">
                <form className="mt-8 flex flex-col gap-4">
                  <InputComp
                    inputType="email"
                    inputValue={signinEmail}
                    inputOnChange={(e) => setSigninEmail(e.target.value)}
                    inputPlaceHolder="name@gmail.com"
                    inputAddonAfter={
                      <MdOutlineAttachEmail className="dark:text-darkSecondary" />
                    }
                  />
                  <InputComp
                    inputType="password"
                    inputValue={signinPassword}
                    inputOnChange={(e) => setSigninPassword(e.target.value)}
                    inputPlaceHolder="*******"
                  />
                  <Button
                    size="lg"
                    className="bg-secondary dark:bg-darkPrimary dark:text-darkSecondary"
                    onClick={signinUser}
                  >
                    {t("signin")}
                  </Button>
                  <a className="text-red-600" onClick={handleForgotModal}>
                    {t("resetPassword")}
                  </a>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
      <ForgotPasswordModalComp open={open} setOpen={setOpen} />
      <FloatBtnComp />
    </div>
  );
}
