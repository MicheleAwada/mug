export default function HrText({ color, text = "or" }) {
	return (
		<div className="flex items-center w-full gap-2">
			<div className="flex-grow h-0.5 bg-gray-200"></div>
			<p className="text-gray-400 pb-1">{text}</p>
			<div className="flex-grow h-0.5 bg-gray-200"></div>
		</div>
	);
}
