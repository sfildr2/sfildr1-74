import { User, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { characterService } from "@/services/characterService";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

interface CharacterImageProps {
    name: string;
    imageUrl?: string;
}

const CharacterImage = ({ name, imageUrl }: CharacterImageProps) => {
    const { toast } = useToast();

    const uploadMutation = useMutation({
        mutationFn: characterService.uploadCharacterImage,
        onSuccess: () => {
            toast({
                title: "Imagem atualizada",
                description: "A imagem do personagem foi atualizada com sucesso!"
            });
        }
    });

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            uploadMutation.mutate(file);
        }
    };

    return (
        <Card className="bg-white/80 border-amber-200/30">
            <CardContent className="p-6">
                <div className="relative w-full aspect-square bg-amber-50/50 rounded-lg border-2 border-dashed border-amber-200/50 flex items-center justify-center">
                    {imageUrl ? (
                        <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                        <User className="w-1/2 h-1/2 text-amber-200/50" />
                    )}
                    <label className="absolute bottom-2 right-2 cursor-pointer">
                        <Upload className="w-6 h-6 text-amber-500" />
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>
                <p className="text-center mt-2 text-amber-800 font-medieval">{name}</p>
            </CardContent>
        </Card>
    );
};

export default CharacterImage;