/* eslint-disable max-len */
export const Badge: React.FC<{ title: string | number }> = ({ title }) => {
  return (
    <div className="absolute -right-1 -top-1 z-50 mb-2 hidden rounded-bl-2xl rounded-tr-2xl border-2 bg-common-light px-3 py-1 sm:block">
      <h4 className="text-center text-lg font-semibold text-common-badge">{title}</h4>
    </div>
  );
};
