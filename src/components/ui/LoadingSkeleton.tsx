import { Skeleton } from "antd";

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton.Image active className="w-full h-[500px]" />
          <div className="space-y-6">
            <Skeleton active title={{ width: "60%" }} paragraph={{ rows: 4 }} />
            <Skeleton.Button active size="large" shape="round" block />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton.Input active size="large" block />
              <Skeleton.Input active size="large" block />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
