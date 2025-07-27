import Navbar from "./(components)/Navbar";

export default function PersonalWebsiteWrapper({children}: {children: React.ReactNode}) {
    return (
        <div className="min-h-screen w-full bg-white">
            <Navbar />
            <main className="w-full">
                {children}
            </main>
        </div>
    );
}