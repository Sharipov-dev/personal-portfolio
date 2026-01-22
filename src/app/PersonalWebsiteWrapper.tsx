import Navbar from "./(components)/Navbar";

export default function PersonalWebsiteWrapper({children}: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen w-full relative">
            <Navbar />
            <main className="w-full relative z-10">
                {children}
            </main>
        </div>
    );
}