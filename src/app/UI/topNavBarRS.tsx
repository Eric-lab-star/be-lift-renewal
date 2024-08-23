import ThemeToggleUI from "./themeToggleUI"

const langs = [
	{label: "ko", key: "ko"},
	{label: "eng", key:"eng"},
	{label: "jpn", key: "jpn"},
	{label: "chn", key:"chn"},
]
export default function TopNavBarRS(){
	return(
		<div className="flex-1 flex justify-end items-stretch">
			{langs.map((lang)=>{
				return <button key={lang.key} className="hover:font-semibold cursor-pointer text-xs flex justify-center items-center px-2">
						<div>{lang.label.toUpperCase()}</div>
					</button>
			})}
			<ThemeToggleUI/>
		</div>
	)
}
