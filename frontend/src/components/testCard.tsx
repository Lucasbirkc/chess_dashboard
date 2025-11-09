import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";

interface TestCardProps {
  username: string;
}

const TestCard: React.FC<TestCardProps> = ({ username }) => {

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Test Card Title</CardTitle>
      </CardHeader>

      <CardContent>
        <p>
            Hello Test Card! From: {username}
        </p>
      </CardContent>
    </Card>
  );
};

export default TestCard;