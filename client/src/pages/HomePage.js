import WelcomeText from "../components/WelcomeText"
import { TrackSection } from "../components/TrackSection"

export const HomePage = () => {
    return (
        <div>
            <WelcomeText userName={"kelvin"} />
            <TrackSection />
        </div>
    )
}