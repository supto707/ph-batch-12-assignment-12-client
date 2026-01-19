const ProductSkeleton = () => {
    return (
        <div className="clean-card h-full flex flex-col animate-pulse">
            <div className="relative aspect-[4/3] bg-[var(--bg-secondary)] border-b border-[var(--border)]"></div>
            <div className="p-5 flex-grow flex flex-col">
                <div className="w-2/3 h-5 bg-[var(--bg-secondary)] rounded mb-3"></div>
                <div className="w-full h-4 bg-[var(--bg-secondary)] rounded mb-2"></div>
                <div className="w-4/5 h-4 bg-[var(--bg-secondary)] rounded mb-4"></div>
                <div className="mt-auto pt-4 border-t border-[var(--border)] flex justify-between items-center">
                    <div className="w-16 h-8 bg-[var(--bg-secondary)] rounded"></div>
                    <div className="w-24 h-10 bg-[var(--bg-secondary)] rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
