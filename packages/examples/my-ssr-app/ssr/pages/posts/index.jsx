import { Card, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { withDelay } from "../../hooks";

const getPosts = () =>
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((r) => r.json())
    .catch((e) => {
      throw e;
    });

const getPostsWithDelay = withDelay(getPosts, 2000);

export default function PostsPage() {
  const { data = [] } = useQuery("posts", getPostsWithDelay);
  return (
    <div>
      <Row>
        {data.map((post) => (
          <Col key={post.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <Card.Link as={Link} to={`/posts/${post.id}`}>
                  Read More
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
