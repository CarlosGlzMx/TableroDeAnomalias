export function parseFilters(filters) {
    Object.keys(filters).forEach((key) => {
        if (filters[key] === "None") {
            filters[key] = "";
        } else if (
            key === "max_score" ||
            key === "min_score" ||
            key === "umbral_anomalia"
        ) {
            filters[key] = parseFloat(filters[key]);
        }
    });
    return filters;
}
