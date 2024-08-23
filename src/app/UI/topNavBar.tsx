import TopNavBarRS from "./topNavBarRS"
import { darkText } from "../styles"
import TopNavBarLS from "./topNavBarLS"

export default function TopNavBar() {

	return(
		<div>
			<div className={`dark:bg-amber-800/30 dark:${darkText} fixed top-0 left-0  bg-white/70 backdrop-blur-lg w-full min-w-max flex items-stretch h-10`}>
				<TopNavBarLS/>
				<TopNavBarRS/>
			</div>
		</div>
	)
}





