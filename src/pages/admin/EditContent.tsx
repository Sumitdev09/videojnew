
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ContentForm from "@/components/admin/ContentForm";
import { Content } from "@/types";
import { contents } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";

const EditContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contentData, setContentData] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call
    const content = contents.find((c) => c.id === id);
    
    if (content) {
      setContentData(content);
    } else {
      setError("Content not found");
    }
    
    setLoading(false);
  }, [id]);

  const handleUpdateContent = (updatedData: Content) => {
    // In a real app, this would update the backend
    // Here we'll just simulate success and navigate back
    
    toast({
      title: "Content updated",
      description: `${updatedData.title} has been updated successfully.`,
    });
    
    // Navigate back to content list
    navigate("/admin/content");
  };

  if (loading) {
    return (
      <Layout>
        <main className="container mx-auto px-4 py-16 pt-28">
          <div className="flex justify-center items-center h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red mx-auto"></div>
              <p className="mt-4 text-netflix-lightGray">Loading content...</p>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <main className="container mx-auto px-4 py-16 pt-28">
          <div className="flex justify-center items-center h-[50vh]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-netflix-red">{error}</h2>
              <button
                onClick={() => navigate("/admin/content")}
                className="mt-6 px-4 py-2 bg-netflix-red hover:bg-netflix-red/90 text-white rounded"
              >
                Return to Content List
              </button>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="container mx-auto px-4 py-16 pt-28">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Edit Content</h1>
            <p className="text-netflix-lightGray mt-2">
              Update the information for your content.
            </p>
          </div>
          
          <div className="bg-netflix-darkGray border border-netflix-mediumGray rounded-md p-6">
            {contentData && (
              <ContentForm initialData={contentData} onSubmit={handleUpdateContent} />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default EditContent;
