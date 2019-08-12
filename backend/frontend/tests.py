from django.test import TestCase
from django.urls import reverse


class IndexViewTests(TestCase):
    def test_future_question(self):
        """
        Index view.
        """
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)
