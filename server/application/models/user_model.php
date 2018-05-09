<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class User_model extends Common_Model
{	
	function __construct(){
		parent::__construct();
	}

	function getProfile($data)
	{
		$this->db->select('*');
		$this->db->where("loginsessionkey = '$data->loginsessionkey'");
		$query = $this->db->get('user_auth');
		$result = $query->row_array();
		return $result;
	}

	function getBookDetail($data)
	{
		$this->db->select('*');
		$this->db->where("book_id = '$data->bookID'");
		$query = $this->db->get('books');
		$result = $query->row_array();
		return $result;
	}

	function getUsers()
	{
		$this->db->select('*');
		$query = $this->db->get('users');
		$result = $query->row_array();
		return $result;
	}

	function getBooks()
	{
		$this->db->select('*');
		$query = $this->db->get('books');
		$result = $query->result_array();
		foreach ($result as $key => $value) {
			$value['showbutton'] = 1;
			$data[] = $value;
		}
		return $data;
	}

	function registeredUsers($data)
	{
		$InsertData['first_name'] = $data->firstName;
		$InsertData['last_name'] = $data->lastName;
		$InsertData['user_name'] = $data->userName;
		$InsertData['email_id'] = $data->email;
		$InsertData['loginsessionkey'] = random_string('unique');;
		$InsertData['password'] = $data->password;
		$this->db->insert('user_auth', $InsertData);
		$returnData['loginsessionkey'] = $InsertData['loginsessionkey'];
		$returnData['user_id'] =  $this->db->insert_id();
		$returnData['firstName'] = $data->firstName;
		$returnData['lastName'] = $data->lastName;
		$returnData['email'] = $data->email;
		$returnData['userName'] = $data->userName;
		return $returnData;
	}

	function login($data)
	{
		$this->db->select('email_id, user_name, first_name, last_name, loginsessionkey');
		$this->db->where("email_id = '$data->email' 
                   AND password = '$data->password'");
		$query = $this->db->get('user_auth');
		if($query->num_rows()>0)
		{
			$row = $query->row_array();
			$row['Message'] = "Success";
			return $row;
		}else{
			$row['Message'] = "Invalid login credentials";
		}
		return $row;
	}

	function editProfile($data)
	{
		$UpdatedData['first_name'] = $data->firstName;
		$UpdatedData['last_name'] = $data->lastName;
		$UpdatedData['user_name'] = $data->userName;
		$this->db->where('loginsessionkey', $data->loginsessionkey);
    	$this->db->update('user_auth', $UpdatedData);
    }
}