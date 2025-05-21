import React from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode; // optional button or link
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Available',
  description = 'There is currently no content to display.',
  icon,
  action,
}) => {
  return (
    <div style={styles.container}>
      {icon && <div style={styles.icon}>{icon}</div>}
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.description}>{description}</p>
      {action && <div style={styles.action}>{action}</div>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#777',
    border: '1px dashed #ccc',
    borderRadius: 10,
    margin: '20px auto',
    maxWidth: 400,
    backgroundColor: '#fafafa',
  },
  icon: {
    fontSize: 48,
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: 24,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  action: {
    marginTop: 20,
  },
};

export default EmptyState;
