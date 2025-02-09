import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PlaceholderImg from '../../src/assets/JobImage.png'; // Add your placeholder image path here
function JobCard({ title, desc, img }) {
    const cardStyles = {
      width: '20rem',
      borderRadius: '15px',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease-in-out',
      overflow: 'hidden',
      backgroundColor: '#fff',
    };
  
    const handleError = (e) => {
      e.target.src = PlaceholderImg; // Fallback to placeholder image on error
    };
  
    return (
      <Card style={cardStyles} className="mb-4 hover:scale-105 hover:shadow-lg">
        <Card.Img
          variant="top"
          src={img || PlaceholderImg}
          alt={img ? 'Job Image' : 'No image available'}
          onError={handleError}
          style={{
            objectFit: 'cover',
            height: '180px',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
          }}
        />
        <Card.Body style={{ padding: '1.5rem', textAlign: 'center' }}>
          <Card.Title style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {title}
          </Card.Title>
          <Card.Text style={{ fontSize: '1rem', color: '#777', marginBottom: '1.5rem' }}>
            {desc}
          </Card.Text>
          <Button
            variant="primary"
            className="w-100"
            style={{
              backgroundColor: '#6A38C2',
              border: 'none',
              padding: '0.75rem',
              fontWeight: 'bold',
              borderRadius: '8px',
            }}
          >
            Apply Now
          </Button>
        </Card.Body>
      </Card>
    );
  }
  
  export default JobCard;