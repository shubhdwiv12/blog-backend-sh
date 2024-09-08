
describe('End-to-End Tests Across All Services', () => {
  let authToken;
  let blogId;

  

  // Step 1: Register a new user
  it('should register a new user in the User Service', () => {
    cy.request({
      method: 'POST',
      url: `/users/register`,
      body: {
        username: 'testUser',
        email: 'testuser@example.com',
        password: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  // Step 2: Login the user to get a token
  it('should log in the user and get a token', () => {
    cy.request({
      method: 'POST',
      url: `/users/login`,
      body: {
        email: 'testuser@example.com',
        password: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      authToken = response.body.token;  // Store the token for future requests
    });
  });

  // Step 3: Create a blog post in the Command Service

  it('should create a blog post in the Command Service', () => {
    cy.request({
      method: 'POST',
      url: `/blogs/add`,
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: {
        blogName: 'Cypress Blog',
        category: 'Tech Industry',
        article: 'This is an article created in the Command Service.This is an article created in the Command Service.This is an article created in the Command Service.This is an article created in the Command ServiceThis is an article created in the Command Service.This is an article created in the Command Service.This is an article created in the Command Service.This is an article created in the Command ServiceThis is an article created in the Command Service.This is an article created in the Command Service.This is an article created in the Command Service.This is an article created in the Command Service.This is an article created in the Command Service.This is an article created in the Command Service.This is an article created in the Command ServiceThis is an article created in the Command Service.This is an article created in the Command Service.This is an article created in the Command ServiceThis is an article created in the Command Service'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      blogId = response.body.id;  // Store the blog ID for future use
    });
  });

  // Step 4: Fetch the blog post from the Query Service
  it('should fetch the blog posts from the Query Service', () => {
    cy.request({
      method: 'GET',
      url: `/blog-query/Allblogs`,
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // Step 5: Delete the blog post in the Command Service
  it('should delete the blog post in the Command Service', () => {
    cy.request({
      method: 'DELETE',
      url: `/blogs/delete/${blogId}`,
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Blog deleted successfully');
    });
  });


});
