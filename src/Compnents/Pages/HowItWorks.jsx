function HowItWorksPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="mainWork">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <div>
              <h2 className="text-4xl font-bold text-center">How it works?</h2>
            </div>
            <div>
              <p className="text-2xl text-center">
                Sky Share (SS) is an easy solution to share files, <br /> text
                and links. Your data is protected.
              </p>
            </div>
          </div>
          <div className="stepsToWork flex justify-center items-center gap-6 mt-10">
            <div className="flex flex-col justify-center items-center gap-2">
              <div>
                <h3 className="text-2xl font-bold">Step 1</h3>
              </div>
              <div>
                <h4 className="text-center text-xl">
                  Make sure that you have <br /> <b> stable</b> internet
                  <b> connection</b>.
                </h4>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div>
                <h3 className="text-2xl font-bold">Step 2</h3>
              </div>
              <div>
                <h4 className="text-center text-xl">
                  Upload to Sky Share anything you want <br /> like <b>text</b>,
                  <b> links</b> and <b>files</b> etc.
                </h4>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div>
                <h3 className="text-2xl font-bold">Step 3</h3>
              </div>
              <div>
                <h4 className="text-center text-xl">
                  Supported on multiple platforms like <br /> <b>Mobiles</b>,
                  <b> Tabs</b> and <b>desktops</b> etc.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksPage;
