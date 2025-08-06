interface TopicTagsProps {
	topics: string[];
	limit?: number;
}

export const TopicTags = ({ topics, limit }: TopicTagsProps) => {
	if (!topics || topics.length === 0) {
		return null;
	}
	
	const displayTopics = limit ? topics.slice(0, limit) : topics;
	const hasMore = limit && topics.length > limit;
	
	return (
		<div className="flex flex-wrap gap-1">
			{displayTopics.map((topic, index) => (
				<span
					key={index}
					className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
				>
					{topic}
				</span>
			))}
			{hasMore && (
				<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
					+{topics.length - limit!} weitere
				</span>
			)}
		</div>
	);
};