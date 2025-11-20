import ResourceCard from "./ResourceCard.jsx";

export default function ResourceGrid({ resources, onDelete }) {
    if (!resources || resources.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-50">
                <p className="text-lg">No resources found matching your filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
                <ResourceCard key={resource.id_recurso} resource={resource} onDelete={onDelete} />
            ))}
        </div>
    );
}
