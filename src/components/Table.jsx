const Table = ({ columns, data }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        {columns.map((col, idx) => (
                            <th key={idx} className="px-4 py-2 border-b text-left text-sm font-semibold">
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center p-4">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                {columns.map((col, j) => (
                                    <td key={j} className="px-4 py-2 border-b text-sm">
                                        {row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
