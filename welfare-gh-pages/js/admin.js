var ADMIN_PASSWORD = 'leeyah2026';
var currentSection = 'dashboard';

function login() {
  var pwd = $('#loginPassword').val();
  if (pwd === ADMIN_PASSWORD) {
    $('#loginSection').hide();
    $('#dashboardSection').show();
    loadDashboard();
  } else {
    alert('Incorrect password!');
  }
}

function logout() {
  $('#loginSection').show();
  $('#dashboardSection').hide();
  $('#loginPassword').val('');
}

function showSection(section) {
  currentSection = section;
  $('.admin-content-section').hide();
  $('#' + section + 'Section').show();
  $('.nav-link').removeClass('active');
  $('[data-section="' + section + '"]').addClass('active');

  if (section === 'blogs') loadBlogs();
  else if (section === 'causes') loadCauses();
  else if (section === 'events') loadEvents();
  else if (section === 'gallery') loadGallery();
  else if (section === 'donors') loadDonors();
}

function loadDashboard() {
  var blogs = JSON.parse(localStorage.getItem('lhf_blogs') || '[]');
  var causes = JSON.parse(localStorage.getItem('lhf_causes') || '[]');
  var events = JSON.parse(localStorage.getItem('lhf_events') || '[]');
  var gallery = JSON.parse(localStorage.getItem('lhf_gallery') || '[]');
  var donors = JSON.parse(localStorage.getItem('lhf_donors') || '[]');

  $('#totalBlogs').text(blogs.length);
  $('#totalCauses').text(causes.length);
  $('#totalEvents').text(events.length);
  $('#totalGallery').text(gallery.length);
  $('#totalDonors').text(donors.length);
}

// ============ BLOGS ============
function saveBlog() {
  var blogs = JSON.parse(localStorage.getItem('lhf_blogs') || '[]');
  var id = $('#blogId').val();
  var blog = {
    title: $('#blogTitle').val(),
    description: $('#blogDesc').val(),
    date: $('#blogDate').val(),
    image: $('#blogImage').val() || 'images/image_1.jpg'
  };

  if (id) {
    blogs[id] = blog;
  } else {
    blogs.unshift(blog);
  }

  localStorage.setItem('lhf_blogs', JSON.stringify(blogs));
  clearBlogForm();
  loadBlogs();
  alert('Blog post saved!');
}

function loadBlogs() {
  var blogs = JSON.parse(localStorage.getItem('lhf_blogs') || '[]');
  var html = '';
  blogs.forEach(function(b, i) {
    html += '<tr><td>' + (i+1) + '</td><td>' + b.title + '</td><td>' + b.date + '</td>';
    html += '<td><button class="btn btn-sm btn-info" onclick="editBlog(' + i + ')">Edit</button> ';
    html += '<button class="btn btn-sm btn-danger" onclick="deleteBlog(' + i + ')">Delete</button></td></tr>';
  });
  $('#blogsTable tbody').html(html || '<tr><td colspan="4" class="text-center">No blog posts yet</td></tr>');
}

function editBlog(index) {
  var blogs = JSON.parse(localStorage.getItem('lhf_blogs') || '[]');
  var b = blogs[index];
  $('#blogId').val(index);
  $('#blogTitle').val(b.title);
  $('#blogDesc').val(b.description);
  $('#blogDate').val(b.date);
  $('#blogImage').val(b.image);
  $('#blogFormTitle').text('Edit Blog Post');
}

function deleteBlog(index) {
  if (!confirm('Delete this blog post?')) return;
  var blogs = JSON.parse(localStorage.getItem('lhf_blogs') || '[]');
  blogs.splice(index, 1);
  localStorage.setItem('lhf_blogs', JSON.stringify(blogs));
  loadBlogs();
}

function clearBlogForm() {
  $('#blogId').val('');
  $('#blogTitle').val('');
  $('#blogDesc').val('');
  $('#blogDate').val('');
  $('#blogImage').val('');
  $('#blogFormTitle').text('Add Blog Post');
}

// ============ CAUSES ============
function saveCause() {
  var causes = JSON.parse(localStorage.getItem('lhf_causes') || '[]');
  var id = $('#causeId').val();
  var cause = {
    title: $('#causeTitle').val(),
    description: $('#causeDesc').val(),
    image: $('#causeImage').val() || 'images/cause-1.jpg',
    progress: $('#causeProgress').val() || 50,
    raised: $('#causeRaised').val() || 0,
    goal: $('#causeGoal').val() || 10000,
    lastDonation: $('#causeLastDonation').val() || '2w ago'
  };

  if (id) {
    causes[id] = cause;
  } else {
    causes.push(cause);
  }

  localStorage.setItem('lhf_causes', JSON.stringify(causes));
  clearCauseForm();
  loadCauses();
  alert('Cause saved!');
}

function loadCauses() {
  var causes = JSON.parse(localStorage.getItem('lhf_causes') || '[]');
  var html = '';
  causes.forEach(function(c, i) {
    html += '<tr><td>' + (i+1) + '</td><td>' + c.title + '</td><td>$' + c.raised + ' of $' + c.goal + '</td>';
    html += '<td><button class="btn btn-sm btn-info" onclick="editCause(' + i + ')">Edit</button> ';
    html += '<button class="btn btn-sm btn-danger" onclick="deleteCause(' + i + ')">Delete</button></td></tr>';
  });
  $('#causesTable tbody').html(html || '<tr><td colspan="4" class="text-center">No causes yet</td></tr>');
}

function editCause(index) {
  var causes = JSON.parse(localStorage.getItem('lhf_causes') || '[]');
  var c = causes[index];
  $('#causeId').val(index);
  $('#causeTitle').val(c.title);
  $('#causeDesc').val(c.description);
  $('#causeImage').val(c.image);
  $('#causeProgress').val(c.progress);
  $('#causeRaised').val(c.raised);
  $('#causeGoal').val(c.goal);
  $('#causeLastDonation').val(c.lastDonation);
  $('#causeFormTitle').text('Edit Cause');
}

function deleteCause(index) {
  if (!confirm('Delete this cause?')) return;
  var causes = JSON.parse(localStorage.getItem('lhf_causes') || '[]');
  causes.splice(index, 1);
  localStorage.setItem('lhf_causes', JSON.stringify(causes));
  loadCauses();
}

function clearCauseForm() {
  $('#causeId').val('');
  $('#causeTitle').val('');
  $('#causeDesc').val('');
  $('#causeImage').val('');
  $('#causeProgress').val('50');
  $('#causeRaised').val('0');
  $('#causeGoal').val('10000');
  $('#causeLastDonation').val('2w ago');
  $('#causeFormTitle').text('Add Cause');
}

// ============ EVENTS ============
function saveEvent() {
  var events = JSON.parse(localStorage.getItem('lhf_events') || '[]');
  var id = $('#eventId').val();
  var event = {
    title: $('#eventTitle').val(),
    description: $('#eventDesc').val(),
    date: $('#eventDate').val(),
    time: $('#eventTime').val(),
    location: $('#eventLocation').val(),
    image: $('#eventImage').val() || 'images/event-1.jpg'
  };

  if (id) {
    events[id] = event;
  } else {
    events.push(event);
  }

  localStorage.setItem('lhf_events', JSON.stringify(events));
  clearEventForm();
  loadEvents();
  alert('Event saved!');
}

function loadEvents() {
  var events = JSON.parse(localStorage.getItem('lhf_events') || '[]');
  var html = '';
  events.forEach(function(e, i) {
    html += '<tr><td>' + (i+1) + '</td><td>' + e.title + '</td><td>' + e.date + '</td><td>' + e.location + '</td>';
    html += '<td><button class="btn btn-sm btn-info" onclick="editEvent(' + i + ')">Edit</button> ';
    html += '<button class="btn btn-sm btn-danger" onclick="deleteEvent(' + i + ')">Delete</button></td></tr>';
  });
  $('#eventsTable tbody').html(html || '<tr><td colspan="5" class="text-center">No events yet</td></tr>');
}

function editEvent(index) {
  var events = JSON.parse(localStorage.getItem('lhf_events') || '[]');
  var e = events[index];
  $('#eventId').val(index);
  $('#eventTitle').val(e.title);
  $('#eventDesc').val(e.description);
  $('#eventDate').val(e.date);
  $('#eventTime').val(e.time);
  $('#eventLocation').val(e.location);
  $('#eventImage').val(e.image);
  $('#eventFormTitle').text('Edit Event');
}

function deleteEvent(index) {
  if (!confirm('Delete this event?')) return;
  var events = JSON.parse(localStorage.getItem('lhf_events') || '[]');
  events.splice(index, 1);
  localStorage.setItem('lhf_events', JSON.stringify(events));
  loadEvents();
}

function clearEventForm() {
  $('#eventId').val('');
  $('#eventTitle').val('');
  $('#eventDesc').val('');
  $('#eventDate').val('');
  $('#eventTime').val('');
  $('#eventLocation').val('');
  $('#eventImage').val('');
  $('#eventFormTitle').text('Add Event');
}

// ============ GALLERY ============
function addGalleryImage() {
  var url = $('#galleryImageUrl').val();
  if (!url) { alert('Please enter an image URL or path'); return; }

  var gallery = JSON.parse(localStorage.getItem('lhf_gallery') || '[]');
  gallery.push({ url: url, title: $('#galleryImageTitle').val() || 'Gallery Image' });
  localStorage.setItem('lhf_gallery', JSON.stringify(gallery));
  $('#galleryImageUrl').val('');
  $('#galleryImageTitle').val('');
  loadGallery();
  alert('Image added to gallery!');
}

function loadGallery() {
  var gallery = JSON.parse(localStorage.getItem('lhf_gallery') || '[]');
  var html = '';
  gallery.forEach(function(g, i) {
    html += '<div class="col-md-3 mb-3"><div class="card"><img src="' + g.url + '" class="card-img-top" style="height:150px;object-fit:cover">';
    html += '<div class="card-body p-2"><p class="card-text small">' + g.title + '</p>';
    html += '<button class="btn btn-sm btn-danger" onclick="deleteGalleryImage(' + i + ')">Remove</button></div></div></div>';
  });
  $('#galleryGrid').html(html || '<div class="col-12 text-center">No gallery images yet</div>');
}

function deleteGalleryImage(index) {
  if (!confirm('Remove this image?')) return;
  var gallery = JSON.parse(localStorage.getItem('lhf_gallery') || '[]');
  gallery.splice(index, 1);
  localStorage.setItem('lhf_gallery', JSON.stringify(gallery));
  loadGallery();
}

// ============ DONORS ============
function addDonor() {
  var donors = JSON.parse(localStorage.getItem('lhf_donors') || '[]');
  var donor = {
    name: $('#donorNameAdm').val(),
    amount: $('#donorAmount').val(),
    cause: $('#donorCause').val(),
    time: $('#donorTime').val() || 'Just now',
    image: $('#donorImage').val() || 'images/person_1.jpg'
  };

  if (!donor.name || !donor.amount) { alert('Name and amount are required'); return; }

  donors.unshift(donor);
  localStorage.setItem('lhf_donors', JSON.stringify(donors));
  $('#donorNameAdm').val('');
  $('#donorAmount').val('');
  $('#donorCause').val('');
  $('#donorTime').val('');
  $('#donorImage').val('');
  loadDonors();
  alert('Donor added!');
}

function loadDonors() {
  var donors = JSON.parse(localStorage.getItem('lhf_donors') || '[]');
  var html = '';
  donors.forEach(function(d, i) {
    html += '<tr><td>' + d.name + '</td><td>$' + d.amount + '</td><td>' + d.cause + '</td><td>' + d.time + '</td>';
    html += '<td><button class="btn btn-sm btn-danger" onclick="deleteDonor(' + i + ')">Delete</button></td></tr>';
  });
  $('#donorsTable tbody').html(html || '<tr><td colspan="5" class="text-center">No donors yet</td></tr>');
}

function deleteDonor(index) {
  if (!confirm('Delete this donor entry?')) return;
  var donors = JSON.parse(localStorage.getItem('lhf_donors') || '[]');
  donors.splice(index, 1);
  localStorage.setItem('lhf_donors', JSON.stringify(donors));
  loadDonors();
}

// ============ RESET / SEED DATA ============
function resetAllData() {
  if (!confirm('This will delete ALL admin-managed data. Continue?')) return;
  localStorage.removeItem('lhf_blogs');
  localStorage.removeItem('lhf_causes');
  localStorage.removeItem('lhf_events');
  localStorage.removeItem('lhf_gallery');
  localStorage.removeItem('lhf_donors');
  loadDashboard();
  alert('All data has been reset. The site will use default static content.');
}

// Enter key to login
$(document).on('keypress', '#loginPassword', function(e) {
  if (e.which === 13) login();
});
