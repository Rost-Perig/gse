import { PageTitle } from "@/components/PageTitle";
import { pageTitles } from "@/constants/constants";

export default function HomePage(){
    return (
        <div className="flex flex-col w-full max-w-maxWidthSite px-6 " style={{ position: 'relative' }}>
            <PageTitle title={pageTitles.HOME} />
        </div>
    )
}